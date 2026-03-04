import { JuicedSubgraph, createJuicedSubgraph } from '@fireballgg/sdk/juiced-subgraph';

// Global type declarations
declare global {
  var juicedSubgraph: JuicedSubgraph | undefined;
}

export function getJuicedSubgraph(): JuicedSubgraph {
  if (!global.juicedSubgraph) {
    global.juicedSubgraph = createJuicedSubgraph();
  }

  return global.juicedSubgraph;
}

// Optional utility function
export function clearClients() {
  global.juicedSubgraph = undefined;
}
