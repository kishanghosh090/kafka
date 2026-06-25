import * as grpc from "@grpc/grpc-js";
import protoloader from "@grpc/proto-loader";
import path from "path";

const dirname = import.meta.dirname;

const PROTO_PATH = path.join(dirname, "greeter.proto");

const packageDefination = protoloader.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefination).greeter as any; // here greeter is package name which is define in proto file greeter as `package greeter;`

function main() {
  const clinet = new proto.GreeterService(
    "localhost:5050",
    grpc.credentials.createInsecure(),
  );

  // const call = clinet.getNumber({ count: 5 });

  //   call.on("data", (res: any) => {
  //     console.log(res);
  //   });
  //   call.on("end", () => {
  //     console.log("stream eneded...");
  //   });

  const call = clinet.sumNumbers((err: any, res: any) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
  });

  call.write({ num: 1 });
  call.write({ num: 23 });
  call.write({ num: 23 });
  call.write({ num: 23 });
  call.end();
}
main();
