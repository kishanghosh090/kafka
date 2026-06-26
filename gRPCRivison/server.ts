import grpc from "@grpc/grpc-js";
import protoloder from "@grpc/proto-loader";
import path from "path";

const dirname = import.meta.dirname;

const PROTO_PATH = path.join(dirname, "greeter.proto");

const packageDefinition = protoloder.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefinition).greeter as any;

function sayHello(call: any, callback: any) {
  const response = {
    message: `Hello ${call.request.name}, age ${call.request.age}`,
  };

  callback(null, response);
}

function getNumbers(call: any) {
  const count = call.request.num;

  let current = 1;

  const interval = setInterval(() => {
    if (current > count) {
      clearInterval(interval);
      call.end();
      return;
    }
    call.wirte({ order: current, number: count * 100 });
    current++;
  }, 1000);
}

function main() {
  const server = new grpc.Server();

  server.addService(proto!!.GreetService!!.service, {
    SayHello: sayHello,
    GetNumbers: getNumbers,
  });

  server.bindAsync(
    "0.0.0.0:5050",
    grpc.ServerCredentials.createInsecure(),
    (err, PORT) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log(`gRPC server is listing at PORT ${PORT}`);
    },
  );
}
main();
