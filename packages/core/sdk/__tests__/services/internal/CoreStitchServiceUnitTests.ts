import {
  anyOfClass,
  anything,
  capture,
  instance,
  mock,
  verify,
  when
} from "ts-mockito";
import {
  CoreStitchAuth,
  StitchAuthRequestClient,
  StitchServiceRoutes
} from "../../../src";
import Method from "../../../src/internal/net/Method";
import { StitchAuthDocRequest } from "../../../src/internal/net/StitchAuthDocRequest";
import { StitchAuthRequest } from "../../../src/internal/net/StitchAuthRequest";
import CoreStitchServiceClientImpl from "../../../src/services/internal/CoreStitchServiceClientImpl";

describe("CoreStitchServiceUnitTests", () => {
  it("should call function internal", () => {
    const serviceName = "svc1";
    const routes = new StitchServiceRoutes("foo");

    const requestClientMock = mock(CoreStitchAuth);

    when(
      requestClientMock.doAuthenticatedRequestWithDecoder(
        anyOfClass(StitchAuthRequest),
        anything()
      )
    ).thenReturn(Promise.resolve(42));

    const requestClient: StitchAuthRequestClient = instance(requestClientMock);

    const coreStitchService = new CoreStitchServiceClientImpl(
      requestClient,
      routes,
      serviceName
    );

    const funcName = "myFunc1";
    const args = [1, 2, 3];
    const expectedRequestDoc = {
      arguments: args,
      name: funcName,
      service: serviceName
    };

    return coreStitchService
      .callFunctionInternal(funcName, args)
      .then(response => {
        expect(response).toBe(42);

        const [docArgument] = capture(
          requestClientMock.doAuthenticatedRequestWithDecoder
        ).last();
        verify(
          requestClientMock.doAuthenticatedRequestWithDecoder(
            anyOfClass(StitchAuthRequest),
            anything()
          )
        ).called();

        const req = docArgument as StitchAuthDocRequest;
        expect(req.method).toEqual(Method.POST);
        expect(req.path).toEqual(routes.functionCallRoute);
        expect(req.document).toEqual(expectedRequestDoc);
      });
  });
});