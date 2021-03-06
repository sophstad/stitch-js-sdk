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


/**
 * Options to use when executing a `find` command on a 
 * [[RemoteMongoCollection]].
 *
 * @see
 * - [[RemoteMongoCollection]]
 * - [[RemoteMongoCollection.find]]
 * - [[RemoteMongoReadOperation]]
 * - [CRUD Snippets](https://docs.mongodb.com/stitch/mongodb/crud-snippets/#find)
 */ 
export default interface RemoteFindOptions {
  /**
   * The maximum number of documents to return.
   */ 
  readonly limit?: number;

  /**
   * Limits the fields to return for all matching documents. See 
   * [Tutorial: Project Fields to Return from Query](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/).
   */
  readonly projection?: object;

  /**
   * The order in which to return matching documents.
   */
  readonly sort?: object;
}
