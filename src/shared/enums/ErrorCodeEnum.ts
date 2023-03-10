export enum ErrorCodeEnum {
  UnexpectedError = 'UNEXPECTED_ERROR',
  Timeout = 'TIMEOUT',
  AccessDenied = 'ACCESS_DENIED',
  BadRequestError = 'BAD_REQUEST_ERROR',
  InvalidInput = 'INVALID_INPUT',
  DataNotFound = 'DATA_NOT_FOUND',
  OfferParameterized = 'OFFER_PARAMETERIZED',
  NotHaveParametrization = 'NOT_HAVE_PARAMETRIZATION',
  ValueIsEmptyError = 'VALUE_IS_EMPTY_ERROR',
  InvoicesPaid = 'INVOICES_PAID',
  CriticalAlreadyAssigned = 'CRITICAL_ALREADY_ASSIGNED',
  SegmentNotFound = 'SEGMENT_NOT_FOUND',
  CpfExist = 'CPF_EXIST'
}

export type ErrorCodeEnumType = `${ErrorCodeEnum}`;
