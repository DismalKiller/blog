"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const cookies = require("js-cookie");
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  avatar: string;
  nickname: string;
}

export default function User() {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = () => {
    if (cookies.get("token")) {
      fetch("/api/admin/user")
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            setUserInfo(res.data);
          }
        });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    cookies.remove("token");
    setUserInfo(null);
    toast({
      title: "Success",
      description: "您已成功退出登录",
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {userInfo ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback>{userInfo.nickname.slice(3, 5)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {/* <DropdownMenuItem>
              <Link href="/user">个人中心</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>
              <Button variant="outline" onClick={handleLogout}>
                退出登录
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="bg-gray-50 dark:bg-black"
        >
          Login
        </Button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-1/4">
          <DialogHeader>
            <DialogTitle>Login / Register</DialogTitle>
          </DialogHeader>
          <LoginForm
            onSuccess={() => setIsOpen(false)}
            onLogin={fetchUserInfo}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
