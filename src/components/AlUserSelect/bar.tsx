import useHook from "./utils/hook";
import Table from "./table.vue";
import Tree from "./Tree.vue";
const Bar = () => {
  const { form } = useHook();
  return (
    <div class="mt-4 flex  justify-between ">
      <Tree class="w-[17%]  float-left !min-h-[600px]"></Tree>
      <Table class="float-right w-[82%]" form={form}></Table>
    </div>
  );
};
export default Bar;
