import * as grpc from "@grpc/grpc-js";
import protoloader from "@grpc/proto-loader";
import path from "path";

const dirname = import.meta.dirname;

const PROTO_PATH = path.join(dirname, "greeter.proto");

const packageDefination = protoloader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefination).greeter as any;

function sayHello(call: any, callBack: any) {
  // db call or other stuffs
  const reply = { messgae: `hello, ${call.request.name}!` };
  callBack(null, reply);
}

function getNumber(call: any) {
  const count = call.request.count;

  let current = 1;

  const interval = setInterval(() => {
    if (current > count) {
      clearInterval(interval);
      call.end();
      return;
    }
    call.write({ order: current, number: current * 100 });
    current++;
  }, 1000);
}

function sumNumbers(call: any, callback: any) {
  let sum = 0;
  call.on("data", (data: any) => {
    sum += data.num;
  });

  call.on("end", () => {
    callback(null, { sum });
  });
}

function main() {
  const server = new grpc.Server();

  server.addService(proto!!.GreeterService!!.service!!, {
    sayHello: sayHello,
    getNumber: getNumber,
    sumNumbers: sumNumbers,
  });
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
