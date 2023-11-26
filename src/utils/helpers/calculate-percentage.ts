import {
  PercentageInputParams,
  PercentageOutputParam,
} from '../types/percentage';

export const calculatePercentage = ({
  totalItems,
  factor,
}: PercentageInputParams): PercentageOutputParam => {
  return (factor / totalItems) * 100;
};
