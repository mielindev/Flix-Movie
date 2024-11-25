import axios from "axios";
import { BASE_LINK, TokenCybersoft } from "../constants";

const fetcher = axios.create({
  baseURL: BASE_LINK,
  headers: {
    TokenCybersoft: TokenCybersoft,
  },
});

export default fetcher;
