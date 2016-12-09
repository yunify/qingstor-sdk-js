// +-------------------------------------------------------------------------
// | Copyright (C) 2016 Yunify, Inc.
// +-------------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0 (the "License");
// | you may not use this work except in compliance with the License.
// | You may obtain a copy of the License in the LICENSE file, or at:
// |
// | http://www.apache.org/licenses/LICENSE-2.0
// |
// | Unless required by applicable law or agreed to in writing, software
// | distributed under the License is distributed on an "AS IS" BASIS,
// | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// | See the License for the specific language governing permissions and
// | limitations under the License.
// +-------------------------------------------------------------------------

var Signer = require('../lib/sign');
var should = require('chai').should();
var pjson = require('../package.json');
var process = require('process');

describe('Signer test', function() {
  var operation = {
    'method': 'PUT',
    'uri': 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl=&upload_id=test_upload_id',
    'body': 'test string',
    'headers': {
      'Host': 'qingstor.com',
      'X-QS-Date': 'test time',
      'Content-Length': 11,
      "Content-Type": "image/jpeg",
      'x-qs-z': 'test-z',
      'x-qs-a': 'test-a',
      'User-Agent': 'QingStorSDK/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')'
    }
  };
  var test = new Signer(operation, 'test_key', 'test_secret');
  it('getCanonicalizedResource test', function() {
    test.getCanonicalizedResource().should.eql(
      '/test_bucket/test_object.jpg?acl&upload_id=test_upload_id'
    )
  });
  it('getAuthorization test', function() {
    test.getAuthorization().should.eql(
      'rnP7tsFg54ezfEYOAixtzC2nZD82Z4IVSQuAaH95JtM='
    )
  });
  it('sign test', function() {
    test.sign().should.eql({
      'method': 'PUT',
      'uri': 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl=&upload_id=test_upload_id',
      'body': 'test string',
      'headers': {
        'Host': 'qingstor.com',
        'X-QS-Date': 'test time',
        'Content-Length': 11,
        'User-Agent': 'QingStorSDK/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')',
        'x-qs-z': 'test-z',
        'x-qs-a': 'test-a',
        "Authorization": "QS test_key:rnP7tsFg54ezfEYOAixtzC2nZD82Z4IVSQuAaH95JtM=",
        'Content-Type': 'image/jpeg'
      }
    })
  })
});
