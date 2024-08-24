import { getNoteById } from "@/data/server/note";
import Render from "../../../components/ui/Render";
type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const { data, error } = await getNoteById(+props.params.id);
  return (
    <div>
      <Render data={data} />
    </div>
  );
}
