import * as grpc from "@grpc/grpc-js";
import protoloader from "@grpc/proto-loader";
import path from "path";

const dirname = import.meta.dirname;

const PROTO_PATH = path.join(dirname, "greeter.proto");

const packageDefination = protoloader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefination).greeter as any; // here greeter is package name which is define in proto file greeter as `package greeter;`

function sayHello(call: any, callBack: any) {
  // db call or other stuffs
  const reply = { messgae: `hello, ${call.request.name}!` };
  callBack(null, reply);
}

function main() {
  const server = new grpc.Server();

  server.addService(proto!!.GreeterService!!.service!!, { sayHello: sayHello });
  server.bindAsync(
    "0.0.0.0:5050",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log(`server is running at PORT ${port}`);
    },
  );
}

main();
