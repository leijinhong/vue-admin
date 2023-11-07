import { defineComponent, h, ref } from "vue";
import { useHook } from "./utils/hook";

export default defineComponent({
  name: "Bar",
  props: {
    mv: [Number, Array]
  },
  emit: ["changeBar"],
  setup(props, { emit }) {
    const { rows } = useHook();

    const stepActive = ref(0);
    const steps = ["上传文件", "导入数据"];

    return () => (
      <div class="mt-5 px-[13%]">
        <ul class="grid grid-cols-3 text-base">
          {steps.map((item, index) => (
            <li key={index} class="leading-[30px] ">
              <span
                class={[
                  "text-center w-[42px] h-[30px] text-white rounded inline-block",
                  stepActive.value == index ? "bg-primary" : "bg-[#CCCCCC]"
                ]}
              >
                {index + 1}
              </span>
              <span class="ml-[10px] inline-block text-[#666]">{item}</span>
            </li>
          ))}
        </ul>

        {stepActive.value == 0 && (
          <>
            <ul>
              {rows.map((item, index) => (
                <li
                  class="mt-[10px] p-5 flex items-center rounded-[2px]"
                  style="border: 1px solid #CCCCCC;"
                  key={index}
                >
                  <i class="text-[60px]">{h(item.icon)}</i>
                  <div class="ml-5">
                    <h1 class="text-[#111111] text-base font-normal">
                      {item.title}
                    </h1>
                    <div class="my-[10px] text-[#999] text-sm">{item.desc}</div>
                    <button
                      class="text-base text-primary bg-transparent"
                      onClick={() => item.btnFn()}
                    >
                      {item.btnTxt}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button class="text-primary text-base mt-[10px] bg-transparent">
              导入记录
            </button>
          </>
        )}

        {stepActive.value == 1 && <div></div>}
      </div>
    );
  }
});
