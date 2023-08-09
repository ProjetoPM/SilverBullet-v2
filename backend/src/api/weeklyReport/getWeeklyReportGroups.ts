import ApiResponseHandler from '../apiResponseHandler';
import WeeklyReportGetGroups from '../../services/weeklyReport/getGroups';

export default async (req, res, next) => {
  try {
    const payload =
      await new WeeklyReportGetGroups().getGroups();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
