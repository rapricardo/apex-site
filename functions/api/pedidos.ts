import { handleOrder } from '../../src/server/orders';

export const onRequest = ({ request, env }: { request: Request; env: { MERCURIO_LEADS_API_KEY?: string } }) => handleOrder(request, env);
