import { Header } from "@/components/Header";
import { ChartsView } from "@/components/Charts";
import { Cards } from "@/components/Cards";
import DateTimePickerForm from "@/components/time-picker/date-time-picker-form";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mt-12">
        <div className="flex gap-10 items-center justify-center">
          <div className=" flex flex-col items-start gap-10 pl-49">
            <DateTimePickerForm />
            <ChartsView />
          </div>
          <Cards />
        </div>
      </div>
    </>
  );
}
