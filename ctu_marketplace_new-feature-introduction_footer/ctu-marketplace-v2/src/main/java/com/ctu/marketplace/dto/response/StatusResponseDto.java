package com.ctu.marketplace.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusResponseDto {
    private Long id;
    private String code;
    private String name;
}
