import ApiResponseHandler from '../apiResponseHandler';
import GetWeeklyReportsService from '../../services/weeklyReport/getWeeklyReportsService';

export default async (req, res, next) => {
  try {
    const payload =
      await new GetWeeklyReportsService(req).handle();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
