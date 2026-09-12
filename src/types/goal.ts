export interface Goal {
  id: string;
  walletAddress: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  asset: 'XLM';
  createdAt: string;
}