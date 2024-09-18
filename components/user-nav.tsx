'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

export function UserNav() {
  const { address } = useAccount();
  const { data, error, status } = useEnsName({ address })
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  return (
    <>
      {(!address || error || status !== "success") ? <Button onClick={openConnectModal}>Connect Wallet</Button> :
        (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/03.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{data || `${address.substring(0, 6)}...`}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {address}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => disconnect()}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>)
      }
    </>
  )
}