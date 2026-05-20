import servicesData from "@/data/services.json";
import { Service } from "./services.types";

const services = servicesData as Service[];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
