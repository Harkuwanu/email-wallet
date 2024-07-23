/**
 *
 * This script is for generating input for the claim circuit.
 *
 */

import { program } from "commander";
import fs from "fs";
import { promisify } from "util";
import { genPsiPointsInput } from "../helpers/psi_points";
import path from "path";
const snarkjs = require("snarkjs");

program
    .requiredOption("--email-addr <string>", "User's email address")
    .requiredOption("--account-code <string>", "User's account code")
    .requiredOption("--relayer-rand <string>", "Relayer's randomness")
    .requiredOption("--input-file <string>", "Path of a json file to write the generated input")
    .option("--silent", "No console logs")
    .option("--prove", "Also generate proof");

program.parse();
const args = program.opts();

function log(...message: any) {
    if (!args.silent) {
        console.log(...message);
    }
}

async function generate() {
    if (!args.inputFile.endsWith(".json")) {
        throw new Error("--input file path arg must end with .json");
    }

    log("Generating Inputs for:", args);

    const circuitInputs = await genPsiPointsInput(args.emailAddr, args.accountCode, args.relayerRand);

    log("\n\nGenerated Inputs:", circuitInputs, "\n\n");

    await promisify(fs.writeFile)(args.inputFile, JSON.stringify(circuitInputs, null, 2));

    log("Inputs written to", args.inputFile);

    if (args.prove) {
        const dir = path.dirname(args.inputFile);
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            circuitInputs,
            path.join(dir, "psi_points.wasm"),
            path.join(dir, "psi_points.zkey"),
            console,
        );
        await promisify(fs.writeFile)(path.join(dir, "psi_points_proof.json"), JSON.stringify(proof, null, 2));
        await promisify(fs.writeFile)(path.join(dir, "psi_points_public.json"), JSON.stringify(publicSignals, null, 2));
        log("✓ Proof for psi_points circuit generated");
    }
    process.exit(0);
}

generate().catch((err) => {
    console.error("Error generating inputs", err);
    process.exit(1);
});
