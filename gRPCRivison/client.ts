import grpc from "@grpc/grpc-js";
import protoloder from "@grpc/proto-loader";
import path from "path";

const dirname = import.meta.dirname;

const PROTO_PATH = path.join(dirname, "greeter.proto");

const packageDefinition = protoloder.loadSync(PROTO_PATH);

const proto = grpc.loadPackageDefinition(packageDefinition).greeter as any;

function main() {
  const client = new proto.GreetService(
    "localhost:5050",
    grpc.credentials.createInsecure(),
  );

  // client.SayHello({ name: "kishan", age: 20 }, (err: any, res: any) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log(res);
  // });

  const call = client.GetNumbers({ num: 10 });
  call.on("data", (res: any) => {
    console.log(res);
  });

  call.on("end", () => {
    console.log("Stream ended...");
  });
}
main();
