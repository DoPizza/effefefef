export default async () => {

    return {

        status: 204,

        body: "",

        headers: {

            "Access-Control-Allow-Origin": "*",

            "Access-Control-Allow-Methods":
                "GET, PUT, PATCH, DELETE, OPTIONS",

            "Access-Control-Allow-Headers":
                "Content-Type",

        },

    };

};
