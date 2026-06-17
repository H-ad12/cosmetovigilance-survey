import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  isAdmin?: boolean;
}

// In-memory store for active session tokens
export const activeSessions = new Set<string>();

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split('Bearer ')[1];
  
  if (activeSessions.has(token)) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }
};

