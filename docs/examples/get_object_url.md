# GET Object Download Url

## Code Snippet

Initialize the Qingstor Signer with your AccessKeyID and SecretAccessKey.

```javascript
import { Signer } from 'qingstor-sdk';

const signer = new Signer('YOUR-ACCESS-KEY-ID', 'YOUR--SECRET-ACCESS-KEY');
```

Then call the getQuerySignature method to get object download url. object_key Sets the filepath of the object to be fetched (in the current bucket).

```javascript
const host = 'zone.qingstor.com';
const bucketName = 'your-bucket-name';

const { expires, signature, access_key_id } = signer.getQuerySignature({
  method: 'GET',
  expiresTTL: 300,
  path: `/${bucketName}/${object_key}`,
});

const url = `https://${bucketName}.${host}/${object_key}?expires=${expires}&signature=${signature}&access_key_id=${access_key_id}`;

console.log(url);
```

- object_key is the complete filepath of the object, such as "<prefix-name><key>"。
- If there are Chinese or special characters in the object_key, you need to encode it。

```javascript
const delimiter = '/';
const object_key = "文件夹/中文.md";

const object_key_encoded = object_key.split(delimiter).map((key) => {
  return encodeURIComponent(key);
}).join(delimiter);
```
