import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("test route works!")
  res.json({ msg: "sup" })

  // res.json({ msg: "hello from testland" })
}
