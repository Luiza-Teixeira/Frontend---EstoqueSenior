import { apiRequest } from '../../../services/api';

export interface DashboardSummary {
  totalProdutosCadastrados: number;
  quantidadeProdutosEstoqueBaixo: number;
  quantidadeVendasDia: number;
  valorTotalVendidoDia: number;
}

export function getDashboardSummary() {
  return apiRequest<DashboardSummary>('/dashboard/resumo');
}
