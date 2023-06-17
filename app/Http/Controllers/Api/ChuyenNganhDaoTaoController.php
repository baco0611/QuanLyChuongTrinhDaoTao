<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuyenNganhDaoTaoResource;
use App\Models\ChuyenNganhDaoTao;
use App\Service\ChuyenNganhDaoTaoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuyenNganhDaoTaoController extends Controller
{
    protected $cndt;
    public function __construct(ChuyenNganhDaoTao $cndt) 
    {
        $this->cndt=$cndt;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request['tenChuyenNganh'];
        $id = $request['id'];
        foreach($data as $val) {
            $cndt = new ChuyenNganhDaoTao();
            $cndt->tenChuyenNganh = $val;
            $cndt->idChuongTrinh=   intval($id);
            $cndt->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}