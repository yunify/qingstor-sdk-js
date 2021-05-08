# 获取文件的下载地址

## 代码片段

使用您的 AccessKeyID 和 SecretAccessKey 初始化 Qingstor Signer 对象。

```javascript
import { Signer } from 'qingstor-sdk';

const signer = new Signer('YOUR-ACCESS-KEY-ID', 'YOUR-SECRET-ACCESS-KEY');
```

然后调用 getQuerySignature 方法获取对象签名并拼接下载地址。object_key 设置要获取的对象的 filepath（位于当前 bucket 中）。

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

- object_key 为对象完整的 filepath，如 "<prefix-name><key>"。
- 如果  object_key 中有中文或特殊字符，则需要 URI 编码。

```javascript
const delimiter = '/';
const object_key = "文件夹/中文.md";

const object_key_encoded = object_key.split(delimiter).map((key) => {
  return encodeURIComponent(key);
}).join(delimiter);
```
