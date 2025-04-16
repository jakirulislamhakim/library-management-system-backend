import { Prisma } from '@prisma/client';
import { TErrorSources } from '../interface/errorInterface';
import httpStatus from 'http-status';

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'An unexpected error occurred';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  const errMetaTarget = (err.meta?.target as string[])?.join(',');
  const errMetaField_name = err.meta?.field_name as string;
  const errDBModelName = err.meta?.modelName as string;

  // Map Prisma error codes to appropriate responses
  switch (err.code) {
    // Input validation errors
    case 'P2000':
      statusCode = httpStatus.BAD_REQUEST;
      message = `The value provided for ${errMetaTarget} is too long. Please provide a shorter value.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2001':
      statusCode = httpStatus.NOT_FOUND;
      message = `No record found for the provided ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2002':
      statusCode = httpStatus.CONFLICT;
      message = `A record with this ${errMetaTarget} already exists. Please use a different value.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2003':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Foreign key violation: ${errMetaField_name} `;
      errorSources = [{ path: errMetaField_name, message }];
      break;

    case 'P2004':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Database constraint violation for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2005':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Invalid value type for ${errMetaTarget}. Please check the expected data type and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2006':
      statusCode = httpStatus.BAD_REQUEST;
      message = `The value provided for ${errMetaTarget} is invalid. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2007':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Data validation failed for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2008':
      statusCode = httpStatus.BAD_REQUEST;
      message =
        'Failed to parse the database query. Please check your input and try again.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2009':
      statusCode = httpStatus.BAD_REQUEST;
      message =
        'Failed to validate the database query. Please check your input and try again.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2010':
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = 'The database query failed to execute. Please try again later.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2011':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Null value provided for ${errMetaTarget} which is not allowed. Please provide a valid value.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2012':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Missing required value for ${errMetaTarget}. Please provide all required fields.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2013':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Missing required argument for ${errMetaTarget}. Please provide all required parameters.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2014':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Invalid relation for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2015':
      statusCode = httpStatus.NOT_FOUND;
      message = `Related record not found for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2016':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Invalid input for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2017':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Related records not properly connected for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2018':
      statusCode = httpStatus.NOT_FOUND;
      message = `Required connected records not found for ${errMetaTarget}. Please check your input and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2019':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Invalid input type for ${errMetaTarget}. Please check the expected data type and try again.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2020':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Value out of range for ${errMetaTarget || errMetaField_name}. Please provide a value within the allowed range.`;
      errorSources = [{ path: errMetaTarget || errMetaField_name, message }];
      break;

    case 'P2021':
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Table ${errMetaTarget} does not exist in the database. Please contact support.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2022':
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Column ${errMetaTarget} does not exist in the database. Please contact support.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2023':
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = `Inconsistent data type for ${errMetaTarget}. Please contact support.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2024':
      statusCode = httpStatus.REQUEST_TIMEOUT;
      message = 'Database connection timed out. Please try again later.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2025':
      statusCode = httpStatus.NOT_FOUND;
      message = `No record found in ${errDBModelName}. Please check your input and try again.`;
      errorSources = [
        {
          path: errDBModelName,
          message: `The expected record is not found in '${errDBModelName}'. Please verify your input.`,
        },
      ];
      break;

    case 'P2026':
      statusCode = httpStatus.BAD_REQUEST;
      message =
        'This database feature is not supported. Please check your request and try again.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2027':
      statusCode = httpStatus.BAD_REQUEST;
      message =
        'Multiple database errors occurred. Please check your input and try again.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2028':
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = 'Transaction failed. Please try again later.';
      errorSources = [{ path: '', message }];
      break;

    case 'P2030':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Full-text search index not found for ${errMetaTarget}. Please check your search query.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2033':
      statusCode = httpStatus.BAD_REQUEST;
      message = `Number overflow for ${errMetaTarget}. Please provide a value within the allowed range.`;
      errorSources = [{ path: errMetaTarget, message }];
      break;

    case 'P2034':
      statusCode = httpStatus.CONFLICT;
      message = 'Transaction failed due to a conflict. Please try again.';
      errorSources = [{ path: '', message }];
      break;

    default:
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message =
        'An unexpected database error occurred. Please try again later.';
      errorSources = [{ path: '', message }];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaError;
