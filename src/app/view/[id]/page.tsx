import { db } from "@/lib/db";
import View from "./View";
import { generateHtml } from "@/layouts/editor/utils/generateHtml";
import { JSDOM } from "jsdom";
import parse from "html-react-parser";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  try {
    const data: any = await db.submissions.findUnique({
      where: {
        id: params.id,
      },
      include: {
        problem: true,
        user: true,
      },
    });
    const dom = new JSDOM();
    global.window = dom.window as unknown as Window & typeof globalThis;
    global.document = dom.window.document;
    global.DocumentFragment = dom.window.DocumentFragment;
    global.Element = dom.window.Element;
    global.navigator = dom.window.navigator;
    const htmlData = await generateHtml(data.content);
    const solution = parse(htmlData);
    if (!data) {
      return <h1 className="flex justify-center mt-5">הדף לא קיים</h1>;
    }
    return (
      <div className="">{data && <View data={data}>{solution}</View>}</div>
    );
  } catch {
    return <h1 className="flex justify-center mt-5">הדף לא קיים</h1>;
  }
};

export default ViewPage;
