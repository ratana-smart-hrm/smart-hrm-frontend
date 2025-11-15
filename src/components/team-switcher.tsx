"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Team {
  name: string;
  logo: React.ElementType;
  plan?: string;
}

export function TeamSwitcher({ team }: { team: Team }) {
  if (!team) return null;

  const Logo = team.logo;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="flex items-center gap-3 hover:bg-sidebar-primary/20 transition-colors rounded-lg"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Logo className="size-4" />
          </div>

          <div className="flex flex-col text-left text-sm leading-tight">
            <span className="truncate font-medium">{team.name}</span>
            {team.plan && (
              <span className="truncate text-xs text-muted-foreground">
                {team.plan}
              </span>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
