import { vi } from "vitest";

// Mock @11ty/eleventy-fetch to avoid network requests in tests
vi.mock("@11ty/eleventy-fetch", () => ({
	default: vi.fn().mockResolvedValue([]),
}));
