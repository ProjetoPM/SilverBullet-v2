import ApiResponseHandler from '../apiResponseHandler';
import GetAllMetricsService from '../../services/weeklyEvaluation/getAllMetricsService';

export default async (req, res, next) => {
  try {

    
    const payload =
      await new GetAllMetricsService(req).handle();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
