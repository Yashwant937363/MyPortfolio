import React from "react";
import {
  Globe,
  Server,
  Database,
  HardDrive,
  Cpu,
  ShieldCheck,
  User,
} from "lucide-react";

export interface DiagramNode {
  id: string;
  title: string;
  subtitle: string;
  category: "browser" | "cache" | "resolver" | "root" | "tld" | "auth" | "app";
  x: number;
  y: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  records?: { key: string; value: string }[];
  description?: string;
}

export interface Connection {
  from: string;
  to: string;
  label: string;
}

export const DIAGRAM_NODES: DiagramNode[] = [
  {
    id: "browser",
    title: "User Browser",
    subtitle: "Client Device (You)",
    category: "browser",
    x: 120,
    y: 390,
    color: "#38bdf8", // sky-400
    icon: Globe,
    description:
      "The client browser initiating HTTP and DNS requests when navigating to domain names like yashwantpoyrekar.dev.",
  },
  {
    id: "cache",
    title: "Browser Cache",
    subtitle: "Local Storage DNS Cache",
    category: "cache",
    x: 450,
    y: 100,
    color: "#a855f7", // purple-500
    icon: HardDrive,
    description:
      "Local storage / OS DNS cache that stores recently resolved domain-to-IP mappings to eliminate unnecessary network lookups.",
    records: [
      { key: "google.com", value: "142.250.190.46" },
      { key: "github.com", value: "140.82.121.4" },
      { key: "amazon.com", value: "205.251.242.103" },
      { key: "netflix.com", value: "54.237.226.164" },
      { key: "apple.com", value: "17.253.144.10" },
      { key: "microsoft.com", value: "20.112.52.29" },
      { key: "yashwantpoyrekar.dev", value: "93.184.216.34" },
      { key: "stackoverflow.com", value: "151.101.65.69" },
      { key: "reddit.com", value: "151.101.1.140" },
      { key: "spotify.com", value: "35.186.224.25" },
    ],
  },
  {
    id: "resolver",
    title: "Recursive Resolver",
    subtitle: "ISP / 8.8.8.8 DNS Service",
    category: "resolver",
    x: 480,
    y: 500,
    color: "#3b82f6", // blue-500
    icon: Server,
    description:
      "The recursive resolver (provided by your ISP or public DNS like Google 8.8.8.8) receives client queries and recursively queries DNS servers across the globe.",
    records: [
      { key: "cache_ttl", value: "300s" },
      { key: "max_connections", value: "1024" },
      { key: "upstream_dns", value: "a.root-servers.net" },
      { key: "dnssec_verify", value: "enabled" },
      { key: "edns_subnet", value: "active" },
      { key: "rate_limit", value: "5000 rps" },
      { key: "log_mode", value: "standard" },
      { key: "fallback_ip", value: "1.1.1.1" },
    ],
  },
  {
    id: "root",
    title: "Root Server",
    subtitle: "DNS Root (.)",
    category: "root",
    x: 840,
    y: 390,
    color: "#ef4444", // red-500
    icon: Cpu,
    description:
      "The top of the DNS hierarchy (13 root server clusters world-wide). Directs resolvers to the appropriate Top-Level Domain (TLD) server.",
    records: [
      { key: ".com", value: "192.5.6.30 (TLD)" },
      { key: ".net", value: "192.5.6.31 (TLD)" },
      { key: ".org", value: "199.19.56.1 (TLD)" },
      { key: ".edu", value: "192.33.4.12 (TLD)" },
      { key: ".gov", value: "192.41.162.30 (TLD)" },
      { key: ".dev", value: "200.7.8.99 (TLD)" },
      { key: ".io", value: "193.0.14.129 (TLD)" },
      { key: ".ai", value: "209.59.119.1 (TLD)" },
      { key: ".app", value: "200.7.8.100 (TLD)" },
      { key: ".uk", value: "194.0.14.1 (TLD)" },
    ],
  },
  {
    id: "tld_dev",
    title: ".dev TLD Server",
    subtitle: "Top-Level Domain (.dev)",
    category: "tld",
    x: 1200,
    y: 150,
    color: "#10b981", // emerald-500
    icon: Database,
    description:
      "The Top-Level Domain server for all .dev domains. Holds delegation records pointing to authoritative DNS name servers.",
    records: [
      { key: "google.dev", value: "ns1.google.com" },
      { key: "flutter.dev", value: "ns1.google.com" },
      { key: "android.dev", value: "ns2.google.com" },
      { key: "golang.dev", value: "ns1.google.com" },
      { key: "yashwantpoyrekar.dev", value: "ns1.yashwant-dns.net" },
      { key: "web.dev", value: "ns1.google.com" },
      { key: "chrome.dev", value: "ns1.google.com" },
      { key: "firebase.dev", value: "ns2.google.com" },
      { key: "react.dev", value: "ns1.vercel-dns.com" },
    ],
  },
  {
    id: "tld_com",
    title: ".com TLD Server",
    subtitle: "Top-Level Domain (.com)",
    category: "tld",
    x: 1200,
    y: 390,
    color: "#64748b", // slate-500
    icon: Database,
    description:
      "The TLD server responsible for .com domain name delegation records.",
    records: [
      { key: "example.com", value: "ns1.example-dns.com" },
      { key: "openai.com", value: "ns1.cloudflare.com" },
      { key: "github.com", value: "ns1.githubdns.net" },
      { key: "google.com", value: "ns1.google.com" },
      { key: "twitter.com", value: "ns1.p34.dynect.net" },
      { key: "amazon.com", value: "pdns1.ultradns.net" },
    ],
  },
  {
    id: "tld_org",
    title: ".org TLD Server",
    subtitle: "Top-Level Domain (.org)",
    category: "tld",
    x: 1200,
    y: 630,
    color: "#64748b", // slate-500
    icon: Database,
    description:
      "The TLD server responsible for .org domain name delegation records.",
    records: [
      { key: "wikipedia.org", value: "ns1.wikimedia.org" },
      { key: "archive.org", value: "ns1.archive.org" },
      { key: "mozilla.org", value: "ns1.mozilla.org" },
      { key: "w3.org", value: "ns1.w3.org" },
    ],
  },
  {
    id: "auth_dns",
    title: "Authoritative DNS",
    subtitle: "ns1.yashwant-dns.net",
    category: "auth",
    x: 1560,
    y: 150,
    color: "#f59e0b", // amber-500
    icon: ShieldCheck,
    description:
      "The official authoritative DNS server for yashwantpoyrekar.dev containing master A, CNAME, MX, TXT, and AAAA records.",
    records: [
      { key: "yashwantpoyrekar.dev SOA", value: "ns1.yashwant-dns.net" },
      { key: "yashwantpoyrekar.dev NS", value: "ns1.yashwant-dns.net" },
      { key: "yashwantpoyrekar.dev MX", value: "mail.yashwant.dev" },
      { key: "yashwantpoyrekar.dev TXT", value: "v=spf1 include:_spf" },
      { key: "yashwantpoyrekar.dev AAAA", value: "2606:2800:220:1:248" },
      { key: "yashwantpoyrekar.dev A", value: "93.184.216.34" },
      { key: "yashwantpoyrekar.dev CNAME", value: "portfolio.yashwant.cdn" },
      { key: "api.yashwantpoyrekar.dev", value: "93.184.216.35" },
    ],
  },
  {
    id: "web_server",
    title: "Web Server (API)",
    subtitle: "Portfolio Host (93.184.216.34)",
    category: "app",
    x: 1560,
    y: 630,
    color: "#ec4899", // pink-500
    icon: User,
    description:
      "The web host at IP address 93.184.216.34 serving the portfolio application content, APIs, and biography data to the client browser.",
    records: [
      { key: "HOST", value: "Ubuntu 22.04 LTS" },
      { key: "ENGINE", value: "Nginx / Node.js" },
      { key: "PORT", value: "443 HTTPS" },
      { key: "SSL", value: "TLS v1.3 Verified" },
      { key: "CACHE", value: "HIT / CDN" },
      { key: "STATUS", value: "200 OK" },
      { key: "CONTENT", value: "Yashwant Poyrekar Bio" },
      { key: "LATENCY", value: "14ms" },
    ],
  },
];

export const CONNECTIONS: Connection[] = [
  { from: "browser", to: "cache", label: "1. Check Local Cache" },
  { from: "browser", to: "resolver", label: "2. DNS Query" },
  { from: "resolver", to: "root", label: "3. Root Query" },
  { from: "root", to: "tld_dev", label: "4. Refer .dev TLD" },
  { from: "root", to: "tld_com", label: "Refer .com TLD" },
  { from: "root", to: "tld_org", label: "Refer .org TLD" },
  { from: "tld_dev", to: "auth_dns", label: "5. Refer Auth DNS" },
  { from: "auth_dns", to: "resolver", label: "6. Return IP 93.184.216.34" },
  { from: "resolver", to: "browser", label: "7. Response IP" },
  {
    from: "browser",
    to: "web_server",
    label: "8. HTTP Request to 93.184.216.34",
  },
];
