"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/coingecko.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebouch";

const SearchModal = () => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchSearch = async () => {
      if (searchText.length > 1) {
        const search = await fetcher(`/search?query=${searchText}`);
        return useDebounce(setSearchData(search?.coins.slice(0, 6)), 200);
      } else {
        // const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
        //   `/search/trending`,
        //   undefined,
        //   300,
        // );
        // setSearchData(trendingCoins.coins.slice(0, 6) || []);
        console.log("hello");
      }
    };
    fetchSearch();
  }, [searchText]);

  return (
    <Dialog>
      <DialogTrigger className="search">
        <span>
          <Search size={16} />
        </span>
        Search
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-1"></DialogHeader>
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Search for a token by name or symbol..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button className={cn("bg-green-400 hover:bg-green-600")}>
            <Search size={16} />
            Search
          </Button>
        </Field>
        <DialogTitle>Trending assets</DialogTitle>
        <DialogDescription>
          {searchData.map((data) => (
            <div key={data.id}>
              <ul className="py-2.5">
                <li>
                  <button
                    onClick={() => router.push(`/coins/${data?.id}`)}
                    className="flex gap-1 cursor-pointer"
                  >
                    <Image
                      src={data?.thumb}
                      alt={data?.name}
                      height={26}
                      width={26}
                    />
                    <p>{data?.name}</p>
                    <p>{data?.current_price}</p>
                  </button>
                </li>
              </ul>
              {/* <DataTable
                data={searchData}
                columns={columns}
                rowKey={(coin) => coin.item.id}
                headerCellClassName="py-3!"
                bodyCellClassName="py-2!"
              /> */}
            </div>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
