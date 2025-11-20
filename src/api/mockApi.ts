import data from '../mocks/opportunities.json';
import tabs from '../mocks/tab.json';

export async function fetchOpportunities({ cursor = 'page_1' }) {
  const page = data.pages.find((p) => p.cursor === cursor);
  await new Promise((res) => setTimeout(res, 800));
  return {
    data: page?.data ?? [],
    nextCursor: page?.nextCursor ?? null,
  };
}
export async function fetchTab() {
  await new Promise((res) => setTimeout(res, 800));
  return {
    data: tabs
  };
}