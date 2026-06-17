import React, { useState, useEffect } from 'react';
import { LogOut, Search, Key, X, Trash2, AlertTriangle } from 'lucide-react';
import { questions } from './utils/questions.ts';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [error, setError] = useState('');
  
  const [responses, setResponses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null);
  
  const [responseToDelete, setResponseToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const storedEmail = localStorage.getItem('admin_email');
    if (token && storedEmail) {
      setIsAuthenticated(true);
      setAdminEmail(storedEmail);
      fetchResponses(token);
    }
  }, []);

  const fetchResponses = async (token: string) => {
    try {
      const res = await fetch('/api/responses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        if (res.status === 401) {
          handleLocalLogout();
          throw new Error('Your session has expired. Please login again.');
        }
        throw new Error('Failed to fetch responses');
      }
      const data = await res.json();
      setResponses(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_email', data.email);
      setAdminEmail(data.email);
      setIsAuthenticated(true);
      fetchResponses(data.token);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLocalLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setIsAuthenticated(false);
    setAdminEmail('');
    setResponses([]);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (err) {
        console.error('Failed to logout cleanly from server:', err);
      }
    }
    handleLocalLogout();
  };

  const handleDelete = async () => {
    if (!responseToDelete) return;
    setIsDeleting(true);
    setDeleteError('');
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Not authenticated.');
      
      const res = await fetch(`/api/admin/submissions/${responseToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete submission.');
      }
      
      await fetchResponses(token);
      setResponseToDelete(null);
    } catch (err: any) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const getReadableAnswer = (questionId: string, value: any) => {
    const q = questions.find(item => item.id === questionId);
    if (!q) return String(value || 'N/A');
    
    if (Array.isArray(value)) {
      return value.map(valId => {
        const opt = q.options?.find(o => o.id === valId);
        return opt ? opt.en : valId;
      }).join(', ');
    } else {
      const opt = q.options?.find(o => o.id === value);
      return opt ? opt.en : String(value || 'N/A');
    }
  };

  const filteredResponses = responses.filter(r => 
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.department.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    if (responses.length === 0) return;
    const headers = ["ID", "Name", "Department", "Year", "Gender", "Age", "Date", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11"];
    const csvRows = [headers.join(',')];
    
    responses.forEach(r => {
      const row = [
        r.id,
        `"${r.fullName}"`,
        `"${r.department}"`,
        `"${r.studyYear}"`,
        `"${r.gender}"`,
        `"${r.age}"`,
        `"${new Date(r.createdAt).toLocaleDateString()}"`,
        `"${r.answers.q1 || ''}"`,
        `"${Array.isArray(r.answers.q2) ? r.answers.q2.join('; ') : (r.answers.q2 || '')}"`,
        `"${r.answers.q3 || ''}"`,
        `"${r.answers.q4 || ''}"`,
        `"${r.answers.q5 || ''}"`,
        `"${r.answers.q6 || ''}"`,
        `"${Array.isArray(r.answers.q7) ? r.answers.q7.join('; ') : (r.answers.q7 || '')}"`,
        `"${Array.isArray(r.answers.q8) ? r.answers.q8.join('; ') : (r.answers.q8 || '')}"`,
        `"${Array.isArray(r.answers.q9) ? r.answers.q9.join('; ') : (r.answers.q9 || '')}"`,
        `"${r.answers.q10 || ''}"`,
        `"${r.answers.q11 || ''}"`,
      ];
      csvRows.push(row.join(','));
    });

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvRows.join('\n'));
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `survey_responses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-700/60 p-8 rounded-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Key className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">Admin Login</h2>
            </div>
            <p className="text-xs text-slate-400 mb-6">Access the survey participant dashboard securely.</p>
            
            {error && (
              <div className="text-red-400 text-xs mb-5 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@survey.app"
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Secure Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium p-2.5 rounded-lg transition-colors cursor-pointer text-sm shadow-md shadow-blue-900/20">
              Login
            </button>
          </form>
          
          <div className="mt-4 p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center">
            <p className="text-xs text-slate-500 font-medium">✨ Administrator Credentials</p>
            <div className="mt-2 text-slate-400 text-xs space-y-1 bg-slate-900/80 py-2 px-3 rounded border border-slate-800 flex flex-col items-center">
              <div>
                <span className="text-slate-500">Email:</span> <code className="font-mono bg-slate-800 px-1 py-0.5 rounded text-blue-400">admin@survey.app</code>
              </div>
              <div>
                <span className="text-slate-500">Password:</span> <code className="font-mono bg-slate-800 px-1 py-0.5 rounded text-emerald-400">AdminSecure2026!</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-slate-900 border border-slate-700 p-6 rounded-xl">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Survey Dashboard</h1>
            <p className="text-slate-400 mt-1">Logged in as {adminEmail} • Total Submissions: {responses.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={exportCSV}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded transition-colors cursor-pointer text-sm font-medium"
            >
              Export CSV
            </button>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-white flex items-center gap-2 px-3 py-2 cursor-pointer text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex gap-4 items-center">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by participant name or department..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-slate-100 flex-1 text-sm focus:ring-0 placeholder:text-slate-500"
            />
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Year</th>
                  <th className="px-6 py-4 font-medium">Gender</th>
                  <th className="px-6 py-4 font-medium">Age</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredResponses.map(r => (
                  <tr key={r.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">{r.fullName}</td>
                    <td className="px-6 py-4 text-slate-450">{r.department}</td>
                    <td className="px-6 py-4 text-slate-400">{r.studyYear}</td>
                    <td className="px-6 py-4 text-slate-400">{r.gender}</td>
                    <td className="px-6 py-4 text-slate-400">{r.age}</td>
                    <td className="px-6 py-4 text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <button 
                        onClick={() => setSelectedResponse(r)} 
                        className="text-blue-400 hover:text-blue-300 cursor-pointer text-sm font-semibold whitespace-nowrap"
                      >
                        View Answers
                      </button>
                      <span className="text-slate-700">|</span>
                      <button 
                        onClick={() => setResponseToDelete(r)} 
                        className="text-rose-500 hover:text-rose-400 cursor-pointer text-sm flex items-center gap-1 font-semibold whitespace-nowrap"
                        title="Permanently Delete Response"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredResponses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                      No responses found matching search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Response Detail Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 max-w-2xl w-full rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/40">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Participant Answers</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedResponse.fullName} ({selectedResponse.department})</p>
              </div>
              <button 
                onClick={() => setSelectedResponse(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
              {/* Participant Profile Card */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Class / Year:</span>
                  <span className="text-slate-200 font-semibold text-sm">{selectedResponse.studyYear}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Gender:</span>
                  <span className="text-slate-200 font-semibold text-sm">{selectedResponse.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Age Group:</span>
                  <span className="text-slate-200 font-semibold text-sm">{selectedResponse.age}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Submission Date:</span>
                  <span className="text-slate-200 font-semibold text-sm">
                    {new Date(selectedResponse.createdAt).toLocaleDateString()} {new Date(selectedResponse.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Answers list */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Responses Mapping</h4>
                <div className="space-y-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800/60">
                  {questions.map((q) => {
                    const val = selectedResponse.answers[q.id];
                    if (val === undefined || val === null || val === '') return null;
                    return (
                      <div key={q.id} className="border-b border-slate-800/80 pb-4 last:border-none last:pb-0">
                        <p className="text-xs text-slate-450 font-medium mb-1">
                          <span className="text-blue-400 font-mono font-bold mr-1">{q.id.toUpperCase()}</span>: {q.en}
                        </p>
                        <p className="text-emerald-400 text-sm font-bold pl-4 border-l-2 border-emerald-500/50">
                          {getReadableAnswer(q.id, val)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-800/40 border-t border-slate-700 flex justify-end">
              <button 
                onClick={() => setSelectedResponse(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close Response
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {responseToDelete && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/60 max-w-md w-full rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex gap-3 items-start">
              <div className="p-3 bg-rose-550/10 bg-opacity-10 text-rose-500 shrink-0 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Permanently Delete Submission</h3>
                <p className="text-xs text-slate-400 mt-1">This action is irreversible.</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-300">
                Are you sure you want to permanently delete the response from <strong className="text-slate-100">{responseToDelete.fullName}</strong> ({responseToDelete.department})?
              </p>
              <div className="bg-rose-950/20 border border-rose-900/30 p-3 rounded-lg text-xs text-rose-300 font-medium leading-relaxed">
                The response has been logged with database ID <code className="font-mono bg-rose-900/40 text-rose-200 px-1 py-0.5 rounded text-xs">{responseToDelete.id}</code>. Deleting it will permanently erase it from the persistent PostgreSQL database.
              </div>
            </div>

            {deleteError && (
              <div className="text-red-400 text-xs p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setResponseToDelete(null)}
                disabled={isDeleting}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900/40 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-rose-950/30"
              >
                {isDeleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
