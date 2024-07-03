import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="h-fit px-16">
        <CardHeader>
          <h1 className="text-center text-xl">Please sign your name</h1>
        </CardHeader>
        <CardContent>
          <Input type="text" className="input: font-bold" />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
