import Table from "./table.vue";
import Tree from "./Tree.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Bar",
  props: {
    mv: [Number, Array],
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    selection: {
      type: Boolean,
      default: false
    }
  },
  emit: ["changeBar"],
  setup(props, { emit }) {
    // 组织id
    const id = ref(-1);
    const isReset = ref(false);

    function handleChange(event: number) {
      id.value = event;
    }

    return () => (
      <div class="mt-4 flex  justify-between ">
        <Tree
          class="w-[17%]  float-left !min-h-[600px]"
          isReset={isReset.value}
          mv={props.mv}
          onChange={(event: number) => handleChange(event)}
        ></Tree>
        <Table
          class="float-right w-[82%]"
          id={id.value}
          mv={props.mv}
          highlightCurrentRow={props.highlightCurrentRow}
          selection={props.selection}
          onReset={event => (isReset.value = event)}
          onChange={event => {
            emit("changeBar", event);
          }}
        ></Table>
      </div>
    );
  }
});
