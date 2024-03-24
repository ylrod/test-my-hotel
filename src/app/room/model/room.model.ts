import { RoomStatus } from "./room-status.type";
import { RoomType } from "./room-type.type";

export interface Room {
  id: number;
  number: number;
  type: RoomType;
  status: RoomStatus;
  pricePerNight: number;
  description: string;
  features: string[];
  createdAt: string;
}
