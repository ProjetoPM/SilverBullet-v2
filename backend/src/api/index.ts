import express from 'express';
import cors from 'cors';
import { authMiddleware } from '../middlewares/authMiddleware';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { createRateLimiter } from './apiRateLimiter';
import { languageMiddleware } from '../middlewares/languageMiddleware';
import authSocial from './auth/authSocial';
import setupSwaggerUI from './apiDocumentation';

const app = express();

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Sets the current language of the request
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware);

// Setup the Documentation
setupSwaggerUI(app);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
app.use(helmet());

// Parses the body of POST/PUT request
// to JSON
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
      if (url.startsWith('/api/plan/stripe/webhook')) {
        // Stripe Webhook needs the body raw in order
        // to validate the request
        (<any>req).rawBody = buf.toString();
      }
    },
  }),
);

// Configure the Entity routes
const routes = express.Router();

// Enable Passport for Social Sign-in
authSocial(app, routes);

require('./auditLog').default(routes);
require('./auth').default(routes);
require('./plan').default(routes);
require('./tenant').default(routes);
require('./file').default(routes);
require('./user').default(routes);
require('./settings').default(routes);
require('./projectCharter').default(routes);
require('./businessCase').default(routes);
require('./benefitsManagementPlan').default(routes);
require('./assumptionLog').default(routes);
require('./stakeholderRegistration').default(routes);
require('./projectManagementPlan').default(routes);
require('./requirementsManagementPlan').default(routes);
require('./requirementDocumentation').default(routes);
require('./scopeManagementPlan').default(routes);
require('./scheduleManagementPlan').default(routes);
require('./projectScopeStatement').default(routes);
require('./workbreakdownStructure').default(routes);
require('./scheduleNetworkDiagram').default(routes);
require('./activityList').default(routes);
require('./resource').default(routes);
require('./resourceRequirements').default(routes);
require('./activityDurationEstimates').default(routes);
require('./stakeholderCalendars').default(routes);
require('./costManagementPlan').default(routes);
require('./costEstimates').default(routes);
require('./qualityManagementPlan').default(routes);
require('./resourceManagementPlan').default(routes);
require('./resourceBreakdownStructure').default(routes);
require('./communicationsManagementPlan').default(routes);
require('./riskManagementPlan').default(routes);
require('./riskRegistration').default(routes);
require('./procurementManagementPlan').default(routes);
require('./procurementStatementWorkRegister').default(routes);
require('./projectPerformanceMonitoringReport').default(routes);
require('./workPerformanceReports').default(routes);
require('./issueLog').default(routes);
require('./lessonLearnedRegister').default(routes);
require('./qualityChecklist').default(routes);
require('./teamPerformanceEvaluation').default(routes);
require('./changeRequest').default(routes);
require('./projectClosure').default(routes);
require('./closedProcurementDocumentation').default(routes);
require('./finalReport').default(routes);

// Loads the Tenant if the :tenantId param is passed
routes.param('tenantId', tenantMiddleware);

// Add the routes to the /api endpoint
app.use('/api', routes);

export default app;
