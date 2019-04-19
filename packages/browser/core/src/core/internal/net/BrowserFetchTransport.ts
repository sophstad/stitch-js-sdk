/**
 * Copyright 2018-present MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  BasicRequest,
  ContentTypes,
  EventStream,
  Headers,
  Response,
  StitchClientError, 
  StitchClientErrorCode, 
  Transport
} from "mongodb-stitch-core-sdk";
import {fetch as fetchPolyfill} from 'whatwg-fetch'

/** @hidden */
export default class BrowserFetchTransport implements Transport {
  public roundTrip(request: BasicRequest): Promise<Response> {
    const responsePromise = fetch(request.url, {
      body: request.body,
      headers: request.headers,
      method: request.method,
      mode: 'cors'
    });

    const responseTextPromise = responsePromise.then(response =>
      response.text()
    );

    return Promise.all([responsePromise, responseTextPromise]).then(values => {
      const response = values[0];
      const body = values[1];
      const headers: { [key: string]: string } = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return new Response(headers, response.status, body);
    });
  }

  public stream(request: BasicRequest, open = true, retryRequest?: () => Promise<EventStream>): Promise<EventStream> {
    throw new StitchClientError(StitchClientErrorCode.StreamingNotSupported);
  }
}
