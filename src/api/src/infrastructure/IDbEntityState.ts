import { Document } from 'mongoose';
import { IEntityState } from '../domain/BaseEntity';

export interface IDbEntityState extends Document, IEntityState {}