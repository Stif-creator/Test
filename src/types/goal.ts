export interface Goal {
  id: string;
  walletAddress: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  asset: 'USDC';
  createdAt: string;
}