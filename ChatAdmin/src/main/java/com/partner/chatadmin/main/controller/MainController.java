package com.partner.chatadmin.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * <pre>
 * Class Name  :
 * Description :
 * Modification Information
 *
 *    수정일　　　 　　  수정자　　　     수정내용
 *    ────────────   ─────────   ───────────────────────────────
 *    2023. 10. 17.   김명호              최초생성
 * </pre>
 *
 * @author 김명호
 * @version 1.0
 * <p>
 * Copyright (C) 2023 by WIIZL All right reserved.
 * @since 2023. 10. 17.
 */
@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
