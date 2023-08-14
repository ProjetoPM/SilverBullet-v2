import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import Error403 from '../../errors/Error403';
import WeeklyReportCreateService from '../../services/weeklyReport/createService';

export default async (req, res, next) => {
  try {

    console.log("body");
    
    console.log(JSON.stringify(req.body));
    
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }
    // new PermissionChecker(req).validateHas(
    //   Permissions.values.tenantEdit,
    // );

    const payload = await new WeeklyReportCreateService(req).create(
      req.body.data, req.language, req.params.tenantId
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
