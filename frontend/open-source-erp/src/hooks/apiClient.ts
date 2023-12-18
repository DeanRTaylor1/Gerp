import { DefaultApi } from "../axios";
import { Configuration } from "../axios/configuration";

const config = new Configuration({ basePath: "http://localhost:8080/api/v1" });
const apiClient = new DefaultApi(config);

export default apiClient;
