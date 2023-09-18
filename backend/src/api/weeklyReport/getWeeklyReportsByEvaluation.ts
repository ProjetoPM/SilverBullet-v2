import ApiResponseHandler from '../apiResponseHandler';
import GetWeeklyReportsByEvaluationService from '../../services/weeklyReport/getWeeklyReportsByEvaluation';

export default async (req, res, next) => {
  try {
    const payload =
      await new GetWeeklyReportsByEvaluationService(req).handle(req.params.id);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
