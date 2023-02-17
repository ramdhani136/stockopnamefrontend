import { FetchApi } from "./FetchApi";

interface IPut {
  data: object;
  id: string | number;
}

interface IData {
  data: string;
  FIND: () => Promise<object>;
  FINDONE?: (doc: string | number) => Promise<any>;
  CREATE?: (doc: object) => Promise<IResponse>;
  UPDATE?: (doc: IPut) => Promise<IResponse>;
  DELETE?: (id: string | number) => Promise<boolean>;
}

interface IResponse {
  status: boolean;
  data: any;
}

export enum DataAPI {
  SCHEDULE = "schedule",
}

class RequestData implements IData {
  data: DataAPI;
  constructor(requestData: DataAPI) {
    this.data = requestData;
  }

  FIND = async (): Promise<object> => {
    try {
      const uri = `http://localhost:5000/${this.data}`;
      const result: any = await FetchApi.get(uri);
      return result.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  };
  // FINDONE = async (id: string | number): Promise<any> => {
  //   try {
  //     const result = await FeatchApi({
  //       action: ActionFetch.GET,
  //       uri: `${process.env.REACT_APP_PUBLIC_URI}${this.data}/${id}`,
  //     });
  //     return result;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // CREATE = async (data: Object): Promise<IResponse> => {
  //   try {
  //     const result: any = await FeatchApi({
  //       action: ActionFetch.POST,
  //       uri: `${process.env.REACT_APP_PUBLIC_URI}${this.data}`,
  //       data: data,
  //     });

  //     console.log(result);

  //     if (result.status === 200) {
  //       return { status: true, data: result };
  //     } else {
  //       Swal.fire(
  //         "Failed!",
  //         `${
  //           result.response.data.message
  //             ? result.response.data.message
  //             : `Check Your Connection!`
  //         }`,
  //         "error"
  //       );
  //       return { status: false, data: result };
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     Swal.fire(
  //       "Failed!",
  //       `${
  //         error.response.data.message
  //           ? error.response.data.message
  //           : `Check Your Connection!`
  //       }`,
  //       "error"
  //     );
  //     return { status: false, data: error };
  //   }
  // };

  // UPDATE = async (data: IPut): Promise<IResponse> => {
  //   try {
  //     const result = await FeatchApi({
  //       action: ActionFetch.PUT,
  //       uri: `${process.env.REACT_APP_PUBLIC_URI}${this.data}/${data.id}`,
  //       data: data.data,
  //     });
  //     console.log(result);
  //     if (result.status === 200) {
  //       return { status: true, data: result };
  //     } else {
  //       Swal.fire(
  //         "Failed!",
  //         `${
  //           result.response.data.message
  //             ? result.response.data.message
  //             : `Check Your Connection!`
  //         }`,
  //         "error"
  //       );
  //       return { status: false, data: result };
  //     }
  //   } catch (error: any) {
  //     Swal.fire(
  //       "Failed!",
  //       `${
  //         error.response.data.message
  //           ? error.response.data.message
  //           : `Check Your Connection!`
  //       }`,
  //       "error"
  //     );
  //     return { status: false, data: error };
  //   }
  // };

  // DELETE = async (id: string | number): Promise<boolean> => {
  //   try {
  //     const result = await FeatchApi({
  //       action: ActionFetch.DELETE,
  //       uri: `${process.env.REACT_APP_PUBLIC_URI}${this.data}/${id}`,
  //     });
  //     if (result.status === 200) {
  //       Swal.fire("Deleted!", "successfully deleted this data", "success");
  //       return true;
  //     } else {
  //       Swal.fire(
  //         "Failed!",
  //         `${
  //           result.response.data.message
  //             ? result.response.data.message
  //             : `Check Your Connection!`
  //         }`,
  //         "error"
  //       );
  //     }
  //     return false;
  //   } catch (error: any) {
  //     console.log(error);
  //     Swal.fire(
  //       "Failed!",
  //       `${
  //         error.response.data.message
  //           ? error.response.data.message
  //           : `Check Your Connection!`
  //       }`,
  //       "error"
  //     );
  //     return false;
  //   }
  // };
}

class GetDataServer {
  static ProsesData = (dataApi: DataAPI): IData => {
    return new RequestData(dataApi);
  };
}

export default GetDataServer.ProsesData;
