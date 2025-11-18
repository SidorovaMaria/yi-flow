import { Button } from "@/components/ui/atoms/Button";
import { Input } from "@/components/ui/atoms/Input";
import { Label } from "@/components/ui/atoms/Label";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Button>Primary Trial</Button>
      <div className="space-y-1">
        <Label htmlFor="word">Word</Label>
        <Input id="word" placeholder="输入汉字 / type the character" />
      </div>
    </div>
  );
}
